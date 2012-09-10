/**
 * 
 */
age.ExtTreePanel = Ext.extend(Ext.tree.Panel,{
    initComponent: function(){
      Ext.apply(this,{
          useArrows: true,
          autoScroll: true,
          animate: true,
          enableDD: true,
          containerScroll: true,
          border: false,
          // auto create TreeLoader
          dataUrl: 'get-nodes.php',
      
          root: {
              nodeType: 'async',
              text: 'Ext JS',
              draggable: false,
              id: 'src'
          }
      });// end of app
      age.ExtTreePanel.superclass.initComponent(this);      
    }//end of initComponent

});
Ext.reg('ageexttree', age.ExtTreePanel);