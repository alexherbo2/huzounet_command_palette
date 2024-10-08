# General options
name = chrome-huzounet-command-palette
version = $(shell git describe --tags --always)

all: assets/huzounet-command-palette-logo@16px.png assets/huzounet-command-palette-logo@32px.png assets/huzounet-command-palette-logo@48px.png assets/huzounet-command-palette-logo@128px.png

assets/huzounet-command-palette-logo.png:
	curl -sSL -z $@ --create-dirs -o $@ https://huzounet.fr/_next/static/media/logo-huzounet.eeafcdfb.png

assets/huzounet-command-palette-logo@16px.png: assets/huzounet-command-palette-logo.png
	magick convert $< -resize '16x16!' $@

assets/huzounet-command-palette-logo@32px.png: assets/huzounet-command-palette-logo.png
	magick convert $< -resize '32x32!' $@

assets/huzounet-command-palette-logo@48px.png: assets/huzounet-command-palette-logo.png
	magick convert $< -resize '48x48!' $@

assets/huzounet-command-palette-logo@128px.png: assets/huzounet-command-palette-logo.png
	magick convert $< -resize '128x128!' $@

build: all
	npm install

release: clean build
	7z a releases/$(name)-$(version).zip manifest.json huzounet_command_palette_module.js assets

clean:
	git clean -d -f -X
