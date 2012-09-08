// Ext.ns('age.TestApp');
// 
// age.TestApp = function(){
	// return {
		// init: function(){
            // Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
            // Ext.QuickTips.init();
            // // Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';
            // // Ext.Direct.addProvider(Imgorg.REMOTING_API);
// //             
            // // Ext.ux.SwfuMgr.on('filequeued', this.onFileQueued, this);
// //             
// 
//             
            // // tabPanel = Ext.getCmp('img-tabpanel');
            // // thumbPanel = tabPanel.getComponent('images-view');
            // // Imgorg.TagWin = new Imgorg.TagWindow();
// 
		// }
	// }
// }();
Ext.onReady(function(){
	
            new Ext.Viewport({
                layout:'border',
                items: [{
                    xtype: 'treepanel',
                    id: 'album-tree',
                    region: 'west',
                    width: 180,
                    minWidth: 180,
                    maxWidth: 180,
                    collapsible: true,
                    split: true,
                    collapseMode: 'mini',
                    margins: '5 0 5 5',
                    cmargins: '0 0 0 0',
                    tbar: [{
                        text: 'Add Album',
                        iconCls: 'add',
                        scale: 'large',
                        handler: function() {
                        }
                    },{
                        text: 'Upload',
                        iconCls: 'upload',
                        scale: 'large',
                        handler: function() {
                        }
                    }]
                },{
                    xtype: 'panel',
                    region: 'center',
                    id: 'img-tabpanel',
                    margins: '5 5 5 0'
                }]
            });
});
