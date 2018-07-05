/**
 * @file   mofron-comp-prjtop/index.js
 * @author simpart
 */
let mf = require('mofron');
let Appbase = require('mofron-comp-appbase');
let Button = require('mofron-comp-button');
let efCenter = require('mofron-effect-center');
let Blur = require('mofron-effect-blur');
let Text = require('mofron-comp-bgtext');

/**
 * @class mofron.comp.prjtop
 * @brief project top contents component for mofron
 */
mf.comp.Prjtop = class extends Appbase {
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Prjtop');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : title
     */
    initDomConts (prm) {
        try {
            super.initDomConts(prm);
            this.target().style({
                'position' : 'relative'
            });
            
            /* image area */
            this.addChild(new mf.Component({}));
            
            let target = new mf.Component({
                style : {
                    'position' : 'absolute',
                    'top'      : '0px',
                },
                width : '100%'
            });
            this.addChild(target);
            this.target(target.target());
            
            /* phrase */
            this.addChild(
                new mf.Component({
                    height : '100%'
                })
            );
            
            /* start button area */
            this.addChild(
                new Button({
                    size   : new mf.Param(300,55),
                    effect : [ 
                        new efCenter({
                           xflag    : true,
                           yflag    : false,
                           posiType : 'absolute'
                        })
                    ],
                    style  : {
                        'bottom'   : '20%'
                    },
                    text   : 'Get Start',
                })
            );
            
            this.height(window.innerHeight - this.header().height());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    image (prm, blr) {
        try {
            let img = this.getChild().child()[0];
            if (undefined === prm) {
                /* getter */
                return (0 === img.child().length) ? null : img.child()[0];
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Image')) {
                throw new Error('invalid parameter');
            }
            prm.execOption({
                size : new mf.Param('100%', this.height())
            });
            img.addChild(prm);
            
            if ('number' === typeof blr) { 
                prm.addEffect(
                    new Blur({ value : blr })
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    phrase (prm) {
        try {
            let phs = this.child()[0];
            if (undefined === prm) {
                /* getter */
                return (0 === phs.child().length) ? null : phs.child()[0];
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Text({
                          style  : { 'margin' : 'auto' },
                          text   : prm,
                          size   : 80,
                          effect : [ new efCenter(true) ]
                      });
            } else if (true !== mf.func.isInclude(prm, 'Text')) {
                throw new Error('invalid parameter');
            }
            phs.addChild(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined === ret) {
                this.target().component().height(prm);
                if (null !== this.image()) {
                    this.image().height(prm);
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Prjtop;
/* end of file */
