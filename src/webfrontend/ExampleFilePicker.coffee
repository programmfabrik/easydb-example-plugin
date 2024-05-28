
class ExampleDownloadManager extends FilepickerDownloadManager
	type: ->
		'Examplefilepicker'

	getBaseConfig: ->
		return ez5.session.getBaseConfig("plugin", 'example-plugin')["ExampleFilepicker"] or {}

	getExportSaveData: ->
		data = super()
		data.export.all_languages = true
		data

	getMetadataFieldOptions: () ->
		return []


class ExampleFilepicker extends Filepicker
	readOpts: ->
		super()
		@setDownloadManagerClass(ExampleDownloadManager)

	type: ->
		'Examplefilepicker'

ez5.session_ready ->
	ExampleFilepicker.session_ready('Examplefilepicker', 'example-plugin')




