/**
 * 
 */
age.ExtTreePanel = Ext.extend(Ext.tree.TreePanel,{
    initComponent: function(){
      Ext.apply(this,{
          root: {
              nodeType: 'async',
              text: 'Ext JS',
              draggable: false,
              id: 'src'
          },
          useArrows: true,
          autoScroll: true,
          animate: true,
          enableDD: true,
          containerScroll: true,
          border: false
      
      });// end of app
      age.ExtTreePanel.superclass.initComponent.call(this);      
    }//end of initComponent

});
Ext.reg('ageexttree', age.ExtTreePanel);