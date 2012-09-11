/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
age.AlbumTree = Ext.extend(Ext.tree.TreePanel,{
    initComponent: function() {
        Ext.apply(this,{
            
            root: new Ext.tree.TreeNode({
                
              nodeType: 'async',
              text: 'AlbumTree',
              draggable: false,
              id: 'src'

            }),
            rootVisible: true,
            clearOnLoad: false,
            autoScroll: true,
            containerScroll: true
        });
        age.AlbumTree.superclass.initComponent.call(this);
    }
});
Ext.reg('albumtree', age.AlbumTree);
