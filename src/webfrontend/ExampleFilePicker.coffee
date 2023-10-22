
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


class EcampleFilepicker extends Filepicker
	readOpts: ->
		super()
		@setDownloadManagerClass(ExampleDownloadManager)

	type: ->
		'Examplefilepicker'

ez5.session_ready ->
	opts = {
		baseConfig: ez5.session.getBaseConfig("plugin", 'example-plugin')["ExampleFilepicker"] or {}
	}
	EcampleFilepicker.session_ready('Examplefilepicker', opts)




