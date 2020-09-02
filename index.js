/**
 * @file mofron-comp-prjtop/index.js
 * @brief project component for mofron
 *        it makes easy to build project top contents
 * @license MIT
 */
const Button   = require("mofron-comp-button");
const Hrzpos   = require("mofron-effect-hrzpos");
const Position = require("mofron-effect-position");
const SynWhei  = require("mofron-effect-synwhei");
const SynHei   = require("mofron-effect-synchei");
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
            this.button(new Button());

            this.childDom().style({ 'position' : 'relative' });
            
            let cnt_ara = new mofron.class.Component({
	                      style: {
			          width:"100%", position:"absolute",
				  top:"0px", display:"grid"
                              },
			      effect: [ new SynWhei({ tag: "Prjtop" }) ],
			      child: [ this.image(), this.text(), this.button() ]
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
		    style: { display :null, position:"absolute" },
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
    text () {
        try {
	    if (0 === arguments.length) {
	        /* getter */
                return this.innerComp("text",undefined,mofron.class.Component);
	    }
	    /* setter */
	    let set = [];
            for (let aidx in arguments) {
                if ('string' === typeof arguments[aidx]) {
                    arguments[aidx] = new Text({ text: arguments[aidx], size:"0.35rem" });
		}
		set.push(arguments[aidx]);
	    }
            this.innerComp(
	        "text",
		new mofron.class.Component({
		    style: { "margin":"auto", "text-align":"center" },
		    child: set
		})
            );
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
		    style: { display: null, position: "relative" },
		    event: new Link({ tag: "Prjtop", url: "./" }),
		    effect: new Hrzpos('center')
		});
		if (undefined !== opt) {
		    this.button().event({ modname: "Link",  tag: "Prjtop" }).url(opt.url, true);
		    delete opt.url;
		    //this.text().config(opt);
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
	    let tgt = { modname: "Synwhei", tag: "Prjtop" };
	    return this.effect(tgt).y_offset(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
}
/* end of file */
