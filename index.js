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
            this.name("Prjtop");
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
            
            let cnt_ara = new mf.Component({
	                      style: { width : "100%", position : "absolute", top: "0px" },
			      effect: [ new SynWhei({ tag: "Prjtop" }) ],
			      child: [ this.image(), this.text(), this.button() ]
			  });
	    this.image().visible(false);
	    this.button().visible(false);
            this.child(cnt_ara);
            
	    /* sync height */
	    let tgt_buf = this.target();
            cnt_ara.target().styleListener(
                "height",
                (sl_1,sl_2,sl_3) => {
                    try { tgt_buf.style(sl_2); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );

	    this.target(cnt_ara.target());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * image config
     * 
     * @param (mixed) string: path to image
     *                mofron-comp-image: replace image component
     * @return (associative array) options image component
     * @type parameter
     */
    image (prm, opt) {
        try {
            if ("string" === typeof prm) {
	        opt = (undefined === opt) ? {} : opt;
		opt["path"]  = prm;
	        this.image().option(opt)
		this.image().option({
		    style: { display : null },
		    effect: [
		        new SynHei(this.target().component()),
			new Hrzpos('center')
                    ]
		});
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
     * @param (mixed) string: phrase text
     *                mofron-comp-text: replace text component
     * @return (associative array) options for text component
     * @type parameter
     */
    text (prm, opt) {
        try {
	    if ('string' === typeof prm) {
                this.text().option({
		    text : prm, size: "0.5rem",
		    style: { "position": "absolute", "z-index": "500" },
		    effect: [ new Hrzpos('center'), new Vrtpos('center', '-10%')]
		});
		if (undefined !== opt) {
                    this.text().option(opt);
		}
		return;
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
     * @param (mixed) mofron-comp-button: replace button component
     *                string: button text
     * @param (associative array) options for buttom component
     *                            url: set jump url (default is './')
     * @return (mofron-comp-button) button component
     * @type parameter
     */
    button (prm, opt) {
        try {
	    if ("string" === typeof prm) {
	        this.button().option({
		    text : prm, size: ['2rem', '0.4rem'],
		    style: { display: null, position: "absolute", bottom: "10%" },
		    event: new Link({ tag: "Prjtop", url: "./" }),
		    effect: new Hrzpos('center')
		});
		if (undefined !== opt) {
		    this.button().event({ name: "Link",  tag: "Prjtop" }).url(opt.url, true);
		    delete opt.url;
		    this.text().option(opt);
                }
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
     * @return (string (size)) offset size
     * @type parameter
     */
    offset (prm) {
        try {
	    let tgt = { name: "Synwhei", tag: "Prjtop" };
	    return this.effect(tgt).offset(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
}
module.exports = mf.comp.Prjtop;
/* end of file */
