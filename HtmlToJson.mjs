// HtmlToJson - by Brian A. Kamp
//
// Convert HTML nodes to JSON format
//
// Notes: JSON cannot include up-tree references to avoid circular refs


import cheerio from "cheerio";

class HtmlToJson {
    id = 0;

	// function pointers to node specific factories
	typeActions = {
		text: this.textNodeFactory,
		tag: this.tagNodeFactory,
		comment: this.commentNodeFactory,
		script: this.scriptNodeFactory,
		style: this.styleNodeFactory,
	}


    constructor(html, startTag = "html") {
		// startTag is base tag for conversion...i.e. "body" will output only the body tag and its antecedents.
        this.html = html;
		this.startTag = startTag;
        this.json = this.HTML_to_JSON(html);
    }

	getHtml() {
		return this.html;
	}
	getJson() {
		return this.json;
	}

    HTML_to_JSON(html) {
        var $ = cheerio.load(html);
        var treeRoot = $(this.startTag)[0];

        return this.dom2JSON(treeRoot);
    }

    dom2JSON(node) {
		var jsonObj;
        var startObj = {
			type: node.type,
			id: this.id
         }
		this.id++;

		if (this.typeActions[node.type]) {
            jsonObj = {
				...startObj,
				...this.typeActions[node.type](node, this.id)
			}		
		} else {
			jsonObj = startObj;
		}

        if (node.children) {
            jsonObj.children = [];
            for (var ix = 0; ix < node.children.length; ix++) {
				if (node.children[ix].type === "text" && node.children[ix].data.trim().length === 0) {
					// whitespace text node  - skip
				} else {
					// recurse children
					jsonObj
						.children
						.push(this.dom2JSON(node.children[ix]));
				}
            }
        }
        return jsonObj;
    }

	styleNodeFactory(node) {
        var obj = {};
        obj.attribs = node.attribs;
		obj.name = node.name;
		obj.namespace = node.namespace;
        return obj;
    }
    textNodeFactory(node) {
        var obj = {};
        obj.data = node.data;
        return obj;
    }
    tagNodeFactory(node) {
        var obj = {};
        obj.name = node.name;
		obj.attribs = node.attribs;
		obj.namespace = node.namespace;
        return obj;
    }
    commentNodeFactory(node) {
        var obj = {};
        obj.data = node.data;
        return obj;
    }
	scriptNodeFactory(node) {
        var obj = {};
        return obj;
    }
	attrStrFactory(node) {
		var retStr = "";
		if (node.attribs) {
			if (node.attribs.id) {
				retStr += "#" + node.attribs.id + " ";
			}
			if (node.attribs.class) {
				retStr += "." + node.attribs.class.trim().replaceAll(" ", " .");
			}
		}
		return retStr.trim();
	}

    toString() {
        return JSON.stringify(this.json);
    }
}

export default HtmlToJson;
