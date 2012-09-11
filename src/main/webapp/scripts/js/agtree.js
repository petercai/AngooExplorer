age.TreePanel = Ext.extend(Ext.tree.TreePanel,{
	
	        title: 'Directory Tree <img src="images/_reload.png" hspace="20" style="cursor:pointer;" title="reload" onclick="Ext.getCmp(\'dirTree\').getRootNode().reload();" alt="Reload" align="middle" />', 
        	closable: false,
            width: 230,
            titlebar: true,
            autoScroll:true,
    	    animate:true, 
    	    //rootVisible: false,
    containerScroll: true,
    enableDD:true,
    ddGroup : 'TreeDD',
	
	initComponent: function(){
		var me = this;
		Ext.applyIf(me,{
    	    loader: new Ext.tree.TreeLoader({
    	    	preloadChildren: true,
    	        dataUrl:'index.php',
    	        baseParams: {option:'com_extplorer', action:'getdircontents', dir: '',sendWhat: 'dirs'} // custom http params
    	    }),
        	listeners: {
            	//"load": { fn: function(node) { chDir( node.id.replace( /_RRR_/g, '/' ), true ); } }, 
        		'contextmenu': { fn: dirContext },
    			'textchange': { fn: function(node, text, oldText) {
    						if( text == oldText ) return true;
    						var requestParams = getRequestParams();
    						var dir = node.parentNode.id.replace( /_RRR_/g, '/' );
    						if( dir == 'ext_root' ) dir = '';
    						requestParams.dir = dir;
    						requestParams.newitemname = text;
    						requestParams.item = oldText;
    						
    						requestParams.confirm = 'true';
    						requestParams.action = 'rename';
    						handleCallback(requestParams);
    						ext_itemgrid.stopEditing();
    						return true;
    					}	
        		},
        		'beforenodedrop': { fn: function(e){
    						    	    	dropEvent = e;
    						    	    	copymoveCtx(e);
    						    	    }
        		},
        		'beforemove': { fn: function() { return false; } }
        	},
        	root: new Ext.tree.AsyncTreeNode({
                text: '/', 
                draggable:false, 
                expanded: true,
                id:'ext_root',
                listeners: {
            		'contextmenu': { fn: dirContext },
            		'load': { fn: expandTreeToDir }
            	}
		    })
		}); // end of applyIf
			age.TreePanel.superclass.initComponent.call(this);
	}, // end of initComponent
	endOfClass: function(){}
});
Ext.reg('agetree',age.TreePanel);
