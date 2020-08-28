/**
 * @file mofron-comp-prjtop/index.js
 * @brief project component for mofron
 *        it makes easy to build project top contents
 * @license MIT
 */
const Button   = require("mofron-comp-button");
const Hriz     = require("mofron-layout-horizon");
const Hrzpos   = require("mofron-effect-hrzpos");
const Vrtpos   = require("mofron-effect-vrtpos");
const Position = require("mofron-effect-position");
const SynWhei  = require("mofron-effect-synwhei");
const SynHei   = require("mofron-effect-synchei");
const Blur     = require("mofron-effect-blur");
const Link     = require("mofron-event-link");
const Text     = require("mofron-comp-bgtext");
const Image    = require("mofron-comp-image");
const ConfArg  = mofron.class.ConfArg;
const comutl   = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) text paramter
     *                object: component option
     * @short text
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Prjtop");
            this.shortForm("text");
            this.config(p1);
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
            this.image(new Image());
            this.innerComp("text",new Text());
	    this.innerComp("text2",new Text());
            this.button(new Button());

            this.childDom().style({ 'position' : 'relative' });
            
            let cnt_ara = new mofron.class.Component({
	                      style: { width : "100%", position : "absolute", top: "0px" },
			      effect: [ new SynWhei({ tag: "Prjtop" }) ],
			      child: [ this.image(), this.text(), this.text2(), this.button() ]
			  });
	    this.image().visible(false);
	    this.button().visible(false);
            this.child(cnt_ara);
            
	    /* sync height */
	    let tgt_buf = this.childDom();
            cnt_ara.childDom().style().listener(
                "height",
                (sl_1,sl_2,sl_3) => {
                    try {
		        tgt_buf.style({ height: sl_2[0] });
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
	    this.childDom(cnt_ara.childDom());
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
     * @param (dict) config for image component
     * @return (mofron-comp-image) image component
     * @type parameter
     */
    image (prm, opt) {
        try {
            if ("string" === typeof prm) {
	        opt = (undefined === opt) ? {} : opt;
		opt["path"]  = prm;
	        this.image().config(opt)
		this.image().config({
		    style: { display : null },
		    effect: [
		        new Position("center","center"),
			new SynHei(this.childDom().component())
		    ]
		});
                return;
	    }
            return this.innerComp('image', prm);
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
     * @param (dict) config for text component
     * @return (mofron-comp-text) text component for phrase text
     * @type parameter
     */
    text (prm, opt) {
        try {
	    if (undefined === prm) {
	        /* getter */
                return this.innerComp('text');
	    }
	    /* setter */
            if ("" === this.text().text()) {
                if ('string' === typeof prm) {
                    this.text().config({
                        text : prm, size: "0.5rem",
                        style: { "position": "absolute", "z-index": "500" },
                        effect: new Position("center",new ConfArg("center", "-0.5rem"))
                    });
                    if (undefined !== opt) {
                        this.text().config(opt);
                    }
		} else {
                    this.innerComp('text', prm);
		}
	    } else {
                this.text2(prm, opt);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * catchphrase of second line
     * 
     * @param (mixed) string: phrase text
     *                mofron-comp-text: replace text component
     * @param (dict) config for text component
     * @return (mofron-comp-text) text component for phrase text
     * @type parameter
     */
    text2 (prm, opt) {
        try {
            if ('string' === typeof prm) {
                this.text2().config({
                    text : prm, size: "0.5rem",
                    style: { "position": "absolute", "z-index": "500" },
                    effect: new Position("center", "center") 
                });
                if (undefined !== opt) {
                    this.text2().config(opt);
                }
                return;
            }
            return this.innerComp('text2', prm);
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
     * @param (dict) config for buttom component
     *               url: set jump url (default is './')
     * @return (mofron-comp-button) button component
     * @type parameter
     */
    button (prm, opt) {
        try {
	    if ("string" === typeof prm) {
	        this.button().config({
		    text : prm, size: new ConfArg('2rem', '0.4rem'),
		    style: { display: null, position: "absolute", bottom: "15%" },
		    event: new Link({ tag: "Prjtop", url: "./" }),
		    effect: new Hrzpos('center')
		});
		if (undefined !== opt) {
		    this.button().event({ name: "Link",  tag: "Prjtop" }).url(opt.url, true);
		    delete opt.url;
		    this.text().config(opt);
                }
		return;
	    }
            return this.innerComp('button', prm);
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
	    return this.effect(tgt).y_offset(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
}
/* end of file */
