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
            this.target().style({ 'position' : 'relative' });
            
            let cnt_ara = new mf.Component({
                style: {  
                    'position' : 'absolute',
                    'top'      : '0px',
                    'width'    : '100%'
                }
            });
            this.image().option({ child: [cnt_ara] });
            this.child([this.image()]);
            this.target(cnt_ara.target());
            this.child([this.text(),this.button()]);
            
            this.height(window.innerHeight  + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    image (prm) {
        try {
            let ret = this.innerComp('image', prm, Image);
            if (undefined !== prm) {
                prm.option({
                    effect: [new Hrzpos('center')], visible : false
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
            if ('string' === typeof prm) {
                this.text().option({ text: prm });
                return;
            } else if (true === mf.func.isComp(prm, 'Text')) {
                prm.option({
                    size: '0.5rem',
                    effect : [ new Hrzpos('center'), new Vrtpos('center', '-15%') ]
                });
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            let ret = this.innerComp('button', prm, Button);
            if (undefined !== prm) {
                prm.execOption({
                    size: ['2rem', '0.4rem'], visible: false,
                    effect : [ new Hrzpos('center'), new Vrtpos('bottom', '40%') ]
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Prjtop;
/* end of file */
