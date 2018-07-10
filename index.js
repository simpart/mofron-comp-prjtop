/**
 * @file   mofron-comp-prjtop/index.js
 * @author simpart
 */
let mf = require('mofron');
let Button = require('mofron-comp-button');
let efCenter = require('mofron-effect-center');
let Blur = require('mofron-effect-blur');
let Text = require('mofron-comp-bgtext');
let Image = require('mofron-comp-image');

/**
 * @class mofron.comp.prjtop
 * @brief project top contents component for mofron
 */
mf.comp.Prjtop = class extends mf.Component{
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
            super.initDomConts();
            this.target().style({
                'position' : 'relative'
            });
            
            /* image area */
            let img = new mf.Dom('div', this);
            this.target().addChild(img);
            this.addSwitchTgt('image', img);
            
            /* contents area */
            let phs = new mf.Dom({
                tag       : 'div',
                component : this,
                style     : { 'width': '100%' }
            });
            let btn = new mf.Dom({
                tag       : 'div',
                component : this,
                style     : {
                    'position' : 'absolute',
                    'width'    : '100%',
                    'bottom'   : '20%'
                }
            });
            let cnt = new mf.Dom({
                tag       : 'div',
                component : this,
                style     : {
                    'position' : 'absolute',
                    'top'      : '0px',
                    'width'    : '100%'
                },
                child : [
                    phs, /* phrase area */
                    btn, /* button area */
                ]
            });
            this.target().addChild(cnt);
            this.target(cnt);
            this.addSwitchTgt('phrase', phs);
            this.addSwitchTgt('button', btn);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    image (prm, blr) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_image) ? null : this.m_image;
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Image(prm);
            }
            if (true !== mf.func.isInclude(prm, 'Image')) {
                throw new Error('invalid parameter');
            }
            
            prm.execOption({
                size   : new mf.Param('100%', this.height()),
                effect : [ ('number' === typeof blr) ? new Blur({ value : blr }) : undefined ]
            }); 
            
            let obj = this;
            this.switchTgt(
                'image',() => { obj.addChild(prm); }
            );
            this.m_image = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    phrase (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_phrase) ? null : this.m_phrase;
            }
            
            /* setter */
            if ('string' === typeof prm) {
                prm = new Text({
                          text   : prm,
                          effect : [ new efCenter(true, true) ]
                      });
            }
            if (true !== mf.func.isInclude(prm, 'Text')) {
                throw new Error('invalid parameter');
            }
            prm.execOption({ size : 80 });
            let obj = this;
            this.switchTgt(
                'phrase',() => { obj.addChild(prm); }
            );
            this.m_phrase = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_button) ? null : this.m_button;
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Button({
                          text   : prm,
                          size   : new mf.Param(200, 40),
                          effect : [ new efCenter(true, false) ]
                      });
            } else if (true !== mf.func.isInclude(prm, 'Button')) {
                 throw new Error('invalid parameter');
            }
            
            let obj = this;
            this.switchTgt(
                'button',() => { obj.addChild(prm); }
            );
            this.m_button = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            let ret = super.height(prm);
            if ( (undefined === ret) && (null !== this.image()) ) {
                this.image().height(prm);
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
