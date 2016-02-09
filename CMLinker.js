if ("undefined" == typeof (CloudMagic)) {
    var CloudMagic = {};
};

CloudMagic.CMLinker = function () {
    //Constants

    var self = this;

    self.init = function () {
        console.log("CMLinker: Initialized");
        
        var linkerUI = document.getElementById("cm_linker_ui");
        if (linkerUI) {
            return;
        }
        
        self.createUI();
        
        var editor = document.getElementById("cm_mail_editor");

        if (!editor) {
            return;
        }
        
        editor.addEventListener("click", function (event) {
            console.log("Click");
            self.handle(event);
        });

        editor.addEventListener("keyup", function (event) {
            console.log("Keyup");
            self.handle(event);
        });
        
    };
    
    self.findPos = function (obj) {
        var curleft = curtop = 0;

        if (obj.offsetParent)
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;

            } while (obj = obj.offsetParent);

        return [curleft, curtop];
    };

    self.createUI = function () {
        console.log("CMLinker: createUI called");
        var uiHTML = '<div id="cm_linker_ui" class="cm-linker" style="display:none;"><div>Testing UI content</div></div>';
        document.body.innerHTML += uiHTML;
    };

    self.show = function (show, item, event) {
        var linkerUI = document.getElementById("cm_linker_ui");
        if (show == true) {
            linkerUI.style.display = "inline-block";
            // position it properly
            var selection = window.getSelection().getRangeAt(0);
            if (selection) {
                var n = selection.startContainer.parentNode;
                var pos = self.findPos(n);
                var top = pos[1] + n.offsetHeight + 5;
                linkerUI.style.top = top;
                linkerUI.style.left = pos[0];
            }
            
        } else {
            linkerUI.style.display = "none";
        }
    };

    self.handle = function (event) {
        console.log("CMLinker: handle() called");
        console.log(event.pageX + ", " + event.pageY);
        var item = self.getAnchorParent();
        console.log(item);
        var link = document.getElementById("cm_linker_ui");

        if (item == false) {
            self.show(false);
            link.firstChild.innerHTML = "";
            return;
        }

        link.firstChild.innerHTML = item[1].href;
        self.show(true, item[1], event);
    };

    self.getAnchorParent = function () {
        var selection = window.getSelection().getRangeAt(0);

        if (selection) {
            var n = selection.startContainer.parentNode.closest("a");
            if (n) {
                return [true, n];
            }
        }

        return false;
    };




}

window.onload = function () {
    var cmLinker = new CloudMagic.CMLinker();
    cmLinker.init();
};