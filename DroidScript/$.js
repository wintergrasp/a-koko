// Include:
// eval(app.ReadFile(app.GetAppPath() + "/$.js"));

var $$ = this,
    appPath = app.GetAppPath();

// Include

function include(fileName, fileExt) {
    return (function ($$) {
        return eval(app.ReadFile(appPath + "/" + fileName + '.' + (fileExt || 'js')));
    }).apply($$, [ $$ ]);
}

include.misc = function (fileName) {
    return include("Misc/" + fileName);
};

include.html = function (fileName) {
    return include("Html/" + fileName);
};

(function () {
    var arrCtrls = {};
    
    function Color(colorCode) { // #RRGGBB / #RRGGBBAA
        if (colorCode) {
            if (colorCode.isArray()) {
                colorCode
            } else if (colorCode.length === 7) { // #RRGGBB
                colorCode = '#FF' + colorCode.substring(1);
            } else if (colorCode.length === 9) { // #RRGGBBAA
                colorCode = colorCode.substring(1);
                colorCode = '#' + colorCode.substring(6) + colorCode.substring(0, 6);
            }
            return colorCode; // #alpha:red:green:blue
        }
        
        return null;
    }
    
    function $(id) {
        return arrCtrls[id];
    }
    this.$ = $;
    
    function Control(o) {
        if (!o)
            throw '[Object] configuration is required!';
        if (!o.id)
            throw '"id" is required!';
        if (arrCtrls[o.id])
            throw 'Control.id="' + o.id + '" already exists!';
        
        if (this instanceof Control) {
            arrCtrls[o.id] = this;
            this.id = o.id;
            this.control = null;
            
            this.visible = function (x) {
                if (x) {
                    this.control.SetVisibility(x);
                    return this;
                } else {
                    return this.control.GetVisibility();
                }
            };
            this.width = function (x) {
                if (x) {
                    if (x === 'auto') {
                        this.control.SetSize(-1, this.height());
                    } else {
                        this.control.SetSize(x / 100, this.height());
                    }
                    return this;
                } else {
                    return this.control.GetWidth();
                }
            };
            this.height = function (x) {
                if (x) {
                    if (x === 'auto') {
                        this.control.SetSize(this.width(), -1);
                    } else {
                        this.control.SetSize(this.width(), x / 100);
                    }
                    return this;
                } else {
                    return this.control.GetHeight();
                }
            };
            this.setMargin = function (top, right, bottom, left) {
                this.control.SetMargins(left, top, right, bottom);
            };
            this.setPosition = function (left, top, width, height) {
                this.control.SetPosition(left, top, width, height);
            };
            this.setSize = function (width, height) {
                this.control.SetSize(width, height);
            };
        }
    }
    this.Control = Control;
    
    function Layout(o) {
        if (this instanceof Layout) {
            this.base(o);
            
            var $this = this,
                type = o.type || 'Linear', // Linear|Frame|Absolute
                options = [],
                vfi = '$control_' + o.id + '_fade_in',
                vfo = '$control_' + o.id + '_fade_out',
                _vfi, _vfo,
                x;
            
            eval("_vfi = function " + vfi + "() { this.visible.apply(it, [true]); }")
            $$[vfi] = _vfi;
            eval("_vfo = function " + vfo + "() { this.visible.apply(it, [true]); }")
            $$[vfo] = _vfo;
            
            // Direction
            if (o.direction) {
                x = o.direction[0].toLower();
                options.push((x === 'h') ? 'Horizontal' : 'Vertical');
            } else {
                options.push('Vertical');
            }
            
            // Full Screen
            if (o.fill) {
                options.push('Fill' + o.fill.toUpper()); // X | Y | XY
            } else if (o.full !== false) {
                options.push('FillXY');
            }
            
            this.control = app.CreateLayout(type, options.join(','));
            
            this.add = function (ctrl) {
                if (ctrl) {
                    if (ctrl instanceof Control)
                        ctrl = ctrl.control;
                    this.control.AddChild(ctrl);
                }
                return this;
            };
            this.remove = function (ctrl) {
                if (ctrl) {
                    if (ctrl instanceof Control)
                        ctrl = ctrl.control;
                    this.control.RemoveChild(ctrl);
                }
                return this;
            }
            this.setBackcolor = function (colorCode, colorCode2) { // #RRGGBB / #RRGGBBAA
                if (colorCode2) {
                    this.control.SetBackGradient(Color(colorCode), Color(colorCode2));
                } else {
                    this.control.SetBackColor(Color(colorCode));
                }
                return this;
            };
            this.fadeIn = function () {
                this.control.Animate("SlideFromLeft", _vfi);
                return this;
            };
            this.fadeOut = function () {
                this.control.Animate("SlideToLeft", _vfo);
                return this;
            };
            
            app.AddLayout(this.control)
        } else {
            return new Layout(o);
        }
    }
    Layout.extend(Control);
    this.Layout = Layout;
    
    function Button(o) {
        if (this instanceof Button) {
            this.base(o);
            
            var $this = this,
                w = o.width || 100,
                h = o.height || 2;
            
            if (w === 'auto') {
                w = -1;
            } else {
                w = w / 100;
            }
            
            if (h === 'auto') {
                h = -1;
            } else {
                h = h / 100;
            }
            
            var it = this,
                op = null,
                click = o.click,
                cc = '$control_' + o.id + '_click',
                _click;
            
            eval("_click = function " + cc + "() { if (click) click.apply(it); }")
            $$[cc] = _click;
            
            if (w >= 100) {
                op = 'FillX';
                w = -1;
                h = -1;
            }
            
            this.control = app.CreateButton(
                o.text || '',
                w, h, op
            );
            this.control.SetOnTouch(_click);
            
            this.text = function (x) {
                if (x) {
                    this.control.SetText(x);
                    return this;
                } else {
                    return this.control.GetText();
                }
            };
            this.click = function (x) {
                if (x) {
                    click = x;
                } else {
                    _click.apply(this.control);
                }
                return this;
            };
            this.addTo = function (lay) {
                lay.AddChild(this.control);
                return this;
            };
            
            o.each(function (x, v) {
                if ($this[x] && (typeof $this[x] === 'function')) {
                    switch (x) {
                        case 'width':
                        case 'height':
                        case 'text':
                            break;
                        default:
                            $this[x].apply($this.control, [v]);
                            break;
                    }
                }
            });
        } else {
            return new Button(o);
        }
    }
    Button.extend(Control);
    this.Button = Button;
    
}).apply(this, [this]);