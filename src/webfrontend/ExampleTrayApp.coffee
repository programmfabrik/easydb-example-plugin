class ExampleTrayApp extends TrayApp
	is_allowed: =>
		# always allow this
		true

	getDisplay: =>
		super()
		button = new LocaButton
			loca_key: "example.tray.app.button"
			onClick: =>
				CUI.alert(text: $$("example.tray.app.thank_you.md"), markdown: true)
		CUI.dom.append(@display, button)

ez5.session_ready ->
	ez5.tray.registerApp(new ExampleTrayApp())

