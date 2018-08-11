/**
 * @file   mofron-comp-prjtop/index.js
 * @author simpart
 */
const mf = require('mofron');
const Button = require('mofron-comp-button');
//const efCenter = require('mofron-effect-center');
const Hrzpos = require('mofron-effect-hrzpos');
const Vrtpos = require('mofron-effect-vrtpos');
const Blur   = require('mofron-effect-blur');
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
            
            /* image area */
            this.target().addChild(this.getTarget(0));
            
            let cnt = new mf.Dom({
                tag       : 'div',
                component : this,
                style     : {
                    'position' : 'absolute',
                    'top'      : '0px',
                    'width'    : '100%'
                },
                child : [
                    this.getTarget(1), /* phrase area */
                    this.getTarget(2), /* button area */
                ]
            });
            this.target().addChild(cnt);
            this.target(cnt);
            
            this.height(
                mf.func.convPx2Rem(window.innerHeight)  + 'px'
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget (prm) {
        try {
            if (undefined === this.m_tgtarea) {
                this.m_tgtarea = [
                    /* image area */
                    new mf.Dom({
                        tag       : 'div',
                        component : this,
                        style     : { 'display': 'flex' }
                    }),
                    /* phrase area */
                    new mf.Dom({
                        tag       : 'div',
                        component : this,
                        style     : {
                            'width'   : '100%',
                            'display' : 'flex'
                        }
                    }),
                    /* button area */
                    new mf.Dom({
                        tag       : 'div',
                        component : this,
                        style     : {
                            'position' : 'absolute',
                            'width'    : '100%',
                            'bottom'   : '20%',
                            'display'  : 'flex'
                        }
                    })
                ];
            }
            if (undefined === this.m_tgtarea[prm]) {
                throw new Error('invalid parameter');
            }
            return this.m_tgtarea[prm];
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
            let eff = [ new Hrzpos('center') ];
            if ('number' === typeof blr) {
                eff.push(new Blur({ value : blr }));
            }
            prm.execOption({
                effect : eff
            }); 
            if (null === prm.width()) {
                prm.execOption({
                    width : '100%'
                });
            }
            if (null === prm.height()) {
                prm.execOption({
                    height : this.height()
                });
            }
            
            this.switchTgt(
                this.getTarget(0),
                (swh_prm) => {
                    try {
                        swh_prm.addChild(prm);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
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
                prm = new Text(prm);
            }
            if (true !== mf.func.isInclude(prm, 'Text')) {
                throw new Error('invalid parameter');
            }
            prm.execOption({
                size   : 0.5,
                effect : [ new Hrzpos('center'), new Vrtpos('center') ]
            });
            this.switchTgt(
                this.getTarget(1),
                (swh_prm) => {
                    try {
                        swh_prm.addChild(prm);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
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
                          size   : new mf.Param(2, 0.4),
                          effect : [ new Hrzpos('center') ]
                      });
            } else if (true !== mf.func.isInclude(prm, 'Button')) {
                 throw new Error('invalid parameter');
            }
            
            let obj = this;
            this.switchTgt(
                this.getTarget(2),
                (swh_prm) => {
                    try {
                        swh_prm.addChild(prm);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
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
                this.getTarget(1).style({
                    height : super.height()
                });
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
