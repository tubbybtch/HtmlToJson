import HtmlToJson from "./HtmlToJson.mjs"

class H2J_NodeOutline2 extends HtmlToJson {

	textNodeFactory(node,id) {
		if (node.data.trim().length === 0) {
			return {delete: true};
		}
        var obj = super.textNodeFactory(node);
		obj.text = node.data.trim();
		obj.expanded = false;
		obj.iconObj = H2J_NodeOutline2.iconFactory(node);
		obj.addOnClass ="nodeText";
        return obj;
    }
    tagNodeFactory(node,id) {
		//console.log(node);
        var obj = super.tagNodeFactory(node);
        obj.name = node.name;
		obj.attribs = node.attribs;
		obj.namespace = node.namespace;
		obj.text = "<"+node.name+">" + H2J_NodeOutline2.attrStrFactory(node);
		obj.expanded = true;
		if (node.name === "head" || node.name === "noscript") {obj.expanded = false;}
		obj.iconObj = H2J_NodeOutline2.iconFactory(node);
		obj.addOnClass ="nodeTag tag" + node.name;
        return obj;
    }
	styleNodeFactory(node,id) {
        var obj = super.tagNodeFactory(node);
        obj.name = node.name;
		obj.attribs = node.attribs;
		obj.namespace = node.namespace;
		obj.text = "<"+node.name+">" + H2J_NodeOutline2.attrStrFactory(node);
		obj.expanded = false;
		obj.iconObj = H2J_NodeOutline2.iconFactory(node);
		obj.addOnClass ="nodeStyle";
        return obj;
    }
    commentNodeFactory(node,id) {
        var obj = super.commentNodeFactory(node);;
        obj.data = node.data;
		obj.text = "<!-- " + node.data + " -->";
		obj.expanded = false;
		obj.iconObj = H2J_NodeOutline2.iconFactory(node);
		obj.addOnClass ="nodeComment";
        return obj;
    }
	scriptNodeFactory(node,id) {
        var obj = super.scriptNodeFactory(node);;
		obj.text = "<script>" ;
		obj.expanded = false;
		obj.iconObj = H2J_NodeOutline2.iconFactory(node);
		obj.addOnClass ="nodeScript";
        return obj;
    }
	static attrStrFactory(node) {
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
    static iconFactory(node) {
        // text
        if (node.type === "text") {
            return {
				name: "pencil",
				spin: false,
				style: {
					color: 'black'
				}
			}
        }
		if (node.type === "comment") {
            return {
				name: "list",
				spin: false,
				style: {
					color: 'blue'
				}
			}
        }
		if (node.type === "script") {
            return {
				name: "asterisk",
				spin: false,
				style: {
					color: 'blue'
				}
			}
        }
        if (node.type === "tag") {
            if (node.name === "div" || node.name === "span") {
                return {
                    name: "folder",
                    spin: false,
                    style: {
                        color: 'crimson'
                    }
                }
            } else if (node.name === "a" || node.name === "link") {
				return {
                    name: "link",
                    spin: false,
                    style: {
                        color: 'teal'
                    }
                }
            } else if (node.name === "ul" || node.name === "li") {
				return {
                    name: "list",
                    spin: false,
                    style: {
                        color: 'darkred'
                    }
                }
            } else if (node.name === "button" || node.name === "input") {
				return {
                    name: "square",
                    spin: false,
                    style: {
                        color: '#222'
                    }
                }
            } else if (node.name === "meta") {
                return {
                    name: "key",
                    spin: false,
                    style: {
                        color: 'purple'
                    }
                }
            } else if (node.name === "title") {
                return {
                    name: "fire",
                    spin: false,
                    style: {
                        color: 'red'
                    }
                }
            } else if (node.name === "noscript") {
				return {
					name: "asterisk",
					spin: false,
					style: {
						color: 'navy'
					}
				}
            } else if (node.name === "header" || node.name === "section" || node.name === "footer") {
				return {
					name: "eye",
					spin: false,
					style: {
						color: 'crimson'
					}
				}
            } else if (node.name === "img" || node.name == "picture") {
				return {
					name: "image",
					spin: false,
					style: {
						color: 'goldenrod'
					}
				}
            }
		}


    }
}

export default H2J_NodeOutline2;