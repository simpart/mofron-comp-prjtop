/**
 * @file   mofron-comp-prjtop/index.js
 * @author simpart
 */
const mf     = require('mofron');
const Button = require('mofron-comp-button');
const Hriz   = require('mofron-layout-horizon');
const Hrzpos = require('mofron-effect-hrzpos');
const Vrtpos = require('mofron-effect-vrtpos');
const Text   = require('mofron-comp-bgtext');
const Image  = require('mofron-comp-image');

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
            this.prmMap('text');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.target().style({
                'position' : 'relative'
            });
            
            let cnt_ara = new mf.Dom({
                tag       : 'div',
                component : this,
                style     : {
                    'position' : 'absolute',
                    'top'      : '0px',
                    'width'    : '100%'
                },
                //child : [ this.text() ]
            });
            this.child([this.image()]);
            this.target().addChild(cnt_ara);
            this.target(cnt_ara);
            
            this.child([this.text(),this.button()]);
            
            this.height(window.innerHeight  + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    image (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_image) {
                    this.image(new Image({ visible : false }));
                }
                return this.m_image;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Image')) {
                throw new Error('invalid parameter');
            }
            prm.execOption({effect : [new Hrzpos('center')]});
            if (undefined !== this.m_image) { 
                this.updChild(this.m_image, prm);
            }
            this.m_image = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_text) {
                    this.text(new Text({ visible : false }));
                }
                return this.m_text;
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Text(prm);
            }
            if (true !== mf.func.isInclude(prm, 'Text')) {
                throw new Error('invalid parameter');
            }
            
            prm.execOption({
                size   : '0.5rem',
                effect : [ new Hrzpos('center'), new Vrtpos('center', '-15%') ]
            });
            if (undefined !== this.m_text) {
                this.updChild(this.m_text, prm);
            }
            this.m_text = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_button) {
                    this.button(new Button({ visible : false }));
                }
                return this.m_button;
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Button(prm);
            }
            if (true !== mf.func.isInclude(prm, 'Button')) {
                throw new Error('invalid parameter');
            }
            
            prm.execOption({
                size   : new mf.Param('2rem', '0.4rem'),
                effect : [ new Hrzpos('center'), new Vrtpos('bottom', '40%') ]
            });
            
            if (undefined !== this.m_button) {
                this.updChild(this.m_button, prm);
            }
            this.m_button = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Prjtop;
/* end of file */
