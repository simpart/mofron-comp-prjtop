/**
 * @file mofron-comp-prjtop/index.js
 * @brief project component for mofron
 *        it makes easy to build project top contents
 * @author simpart
 */
const mf      = require("mofron");
const Button  = require("mofron-comp-button");
const Hriz    = require("mofron-layout-horizon");
const Hrzpos  = require("mofron-effect-hrzpos");
const Vrtpos  = require("mofron-effect-vrtpos");
const SynWhei = require("mofron-effect-synwhei");
const SynHei  = require("mofron-effect-synchei");
const Blur    = require("mofron-effect-blur");
const Link    = require("mofron-event-link");
const Text    = require("mofron-comp-bgtext");
const Image   = require("mofron-comp-image");

let mod_name = "Prjtop";
mf.comp.Prjtop = class extends mf.Component{
    /**
     * initialize component
     * 
     * @param (mixed) text paramter
     *                object: component option
     * @pmap text
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name(mod_name);
            this.prmMap("text");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.target().style({ 'position' : 'relative' });
            let topdom = this.target();

            let cnt_ara = new mf.Component({ style: { 'width' : '100%' } });
            this.image().option({ child: [cnt_ara] });
            this.child([this.image()]);
            this.target(cnt_ara.target());
            this.child([this.text(),this.button()]);
            
            this.effect([new SynWhei({ tag: mod_name })]);
            this.style({ position:"absolute", top: "0px" });
            
	    this.height(window.innerHeight + "px");
	    let prj = this;
	    this.target().styleListener(
	        'height',
		(st1,st2) => {
		    try {
		        let hei = mf.func.getSize(st2.height);
			topdom.style({ "height" : st2.height });
		        prj.button().style({ "top" : hei.value() * 0.5 + "px" });
			prj.image().height((hei.value() - 10) + "px");
		    } catch (e) {
                        console.error(e.stack);
                        throw e;
	            }
		}
	    );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * image config
     * 
     * @param (string) path to image
     * @param (string (size)) blur size
     * @return (mofron-comp-image) image component
     * @type parameter
     */
    image (prm, blr) {
        try {
            if (true === mf.func.isInclude(prm, "Image")) {
                prm.option({
                    width: "100%",
		    style: {
		        "position" : "relative",
			"z-index"  : "400"
		    },
                    effect: [
                        new Hrzpos('center'),
                        new Blur({ tag: mod_name, value: (undefined === blr) ? '0rem' : blr })
                    ]
                });
		let o_img = this.m_inncmp["image"];
		if ( (undefined !== o_img) && (0 < o_img.child().length) ) {
		    prm.child(o_img.child());
		}
            } else if ("string" === typeof prm) {
                this.image().path(prm);
                this.image().effect(["Blur", mod_name]).value(blr);
                return;
            }
            return this.innerComp('image', prm, Image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * catchphrase
     * 
     * @param (string) phrase text
     * @return (mofron-comp-text) text component
     * @type parameter
     */
    text (prm) {
        try {
            if ('string' === typeof prm) {
                this.text().option({ text: prm });
                return;
            } else if (true === mf.func.isComp(prm, 'Text')) {
                prm.option({
                    size: '0.5rem',
		    style: {
		        "position" : "relative",
			"z-index"  : "400"
		    },
                    effect : [
                        new Hrzpos('center'),
                        new Vrtpos({ type: 'center', offset:'-15%', contsIndex: 1 })
                    ]
                });
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get start button 
     *
     * @param (mixed) mofron-comp-button: link component
     *                string: button text
     * @param (string) link path
     * @return (mofron-comp-button) button component
     * @type parameter
     */
    button (prm, pth) {
        try {
            if (undefined !== pth) {
                this.button().event(new Link(pth));
            }
            if (true === mf.func.isComp(prm)) {
                prm.option({
		    style: {
		        "position" : "relative",
			"z-index"  : "500",
		    },
                    size: ['2rem', '0.4rem'], visible: false,
                    effect: [ new Hrzpos({ type: 'center', contsIndex: 2 }) ]
                });
            } else if ('string' === typeof prm) {
                this.button().option({ text: prm, visible: true });
                return;
            }
            return this.innerComp('button', prm, Button);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * image offset
     * 
     * @param (string (size)) offset size
     * @type parameter
     */
    offset (prm) {
        try {
	    return this.effect(["Synwhei", mod_name]).offset(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
}
module.exports = mf.comp.Prjtop;
/* end of file */
