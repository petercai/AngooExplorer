Ext.ns('age','age.TestApp');
	
age.TestApp = function(){
	return {
		init: function(){
            Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
            Ext.QuickTips.init();
            new Ext.Viewport({
                layout:'border',
                items:[
                {
                    region: 'north',
                    contentEl: 'ext_header',
                    width: '100%'
                },
                {
                    /*
                     * TODO: TREE PANEL
                     */
                    xtype: 'agetree',
                    split: true,
                    region: 'west',
                    width: 150
                 },
                {
                    xtype: 'panel',
                	width: 150,
                	split: true,
                    region: 'east',
                    html: 'East Panel'
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    html: 'Center panel',
                    margins: '0 0 0 0'
                }]
            });
		}
	}
}();


Ext.onReady(age.TestApp.init,age.TestApp);
