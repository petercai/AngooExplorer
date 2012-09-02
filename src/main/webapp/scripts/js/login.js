Ext.onReady( function() {
	var loginPanel = new Ext.FormPanel(	{
		xtype: "form",
		renderTo: "adminForm", 		title: "Login",
		id: "simpleform",
		labelWidth: 125, // label settings here cascade unless overridden
		url: "index.php",
		frame: true,
		keys: {
		    key: Ext.EventObject.ENTER,
		    fn  : function(){
				if (loginPanel.getForm().isValid()) {
					Ext.get( "statusBar").update( "Please wait..." );
					Ext.getCmp("simpleform").getForm().submit({
						reset: false,
						success: function(form, action) { location.replace('main.html') },
						failure: function(form, action) {
							if( !action.result ) return;
							Ext.Msg.alert('Error(s)', action.result.error, function() {
							this.findField( 'password').setValue('');
							this.findField( 'password').focus();
							}, form );
							Ext.get( 'statusBar').update( action.result.error );
						},
						scope: Ext.getCmp("simpleform").getForm(),
						params: {
							option: "com_extplorer", 
							action: "login",
							type : "extplorer"
						}
					});
    	        } else {
        	        return false;
            	}
            }
		},
		items: [{
            xtype:"textfield",
			fieldLabel: "Username",
			name: "username",
			width:175,
			allowBlank:false
		},{
			xtype:"textfield",
			fieldLabel: "Password",
			name: "password",
			inputType: "password",
			width:175,
			allowBlank:false
		}, new Ext.form.ComboBox({
			
			fieldLabel: "Language",
			store: new Ext.data.SimpleStore({
		fields: ['language', 'langname'],
		data :	[
		['arabic', 'Arabic' ],['brazilian_portuguese', 'Brazilian Portuguese' ],['bulgarian', 'Bulgarian' ],['czech', 'Czech' ],['danish', 'Danish' ],['dutch', 'Dutch' ],['english', 'English' ],['finnish', 'Finnish' ],['french', 'French' ],['german', 'German' ],['germanf', 'Germanf' ],['germani', 'Germani' ],['greek', 'Greek' ],['hungarian', 'Hungarian' ],['hungariani', 'Hungariani' ],['islenska', 'Islenska' ],['italian', 'Italian' ],['japanese', 'Japanese' ],['norwegian', 'Norwegian' ],['polish', 'Polish' ],['portuguese', 'Portuguese' ],['romanian', 'Romanian' ],['russian', 'Russian' ],['serbian', 'Serbian' ],['simplified_chinese', 'Simplified Chinese' ],['slovenian', 'Slovenian' ],['spanish', 'Spanish' ],['swedish', 'Swedish' ],['traditional_chinese', 'Traditional Chinese' ],['turkish', 'Turkish' ]			]
	}),
			displayField:"langname",
			valueField: "language",
			value: "english",
			hiddenName: "lang",
			disableKeyFilter: true,
			editable: false,
			triggerAction: "all",
			mode: "local",
			allowBlank: false,
			selectOnFocus:true
		}),
		{
			xtype: "displayfield",
			id: "statusBar"
		}
		],
		buttons: [{
			text: "Login", 
			type: "submit",
			handler: function() {
				Ext.get( "statusBar").update( "Please wait..." );
				Ext.getCmp("simpleform").getForm().submit({
					reset: false,
					success: function(form, action) { 
						location.replace("peter.html"); 
						},
					failure: function(form, action) {
						if( !action.result ) return;
						Ext.Msg.alert('Error(s)', action.result.error, function() {
							this.findField( 'password').setValue('');
							this.findField( 'password').focus();
							}, form );
						Ext.get( 'statusBar').update( action.result.error );
						
					},
					scope: Ext.getCmp("simpleform").getForm(),
					params: {
						option: "com_extplorer", 
						action: "login",
						type : "extplorer"
					}
				});
			}
		},		{
			text: 'Reset', 
			handler: function() { loginPanel.getForm().reset(); } 
		}
				]
	}
	
	);
	
	Ext.get( 'formContainer').center();
	Ext.get( 'formContainer').setTop(100);
	loginPanel.getForm().findField('username').focus();

	Ext.EventManager.onWindowResize(function() {
		Ext.get('formContainer').center();
		Ext.get('formContainer').setTop(100);
	}); 
});
