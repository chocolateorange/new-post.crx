.DEFAULT_GOAL := all

SHELL := /bin/bash

export PATH := $(shell npm bin):$(PATH)

JSC := webpack
JSFLAGS := --colors --display-error-details --progress

.PHONY: all
all: ## show targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: opts1 := --pack-extension=./ext --pack-extension-key=./ext.pem
build: opts2 := --pack-extension=./ext
build: ## build crx file
	"$$(which-chrome Chrome)" $(opts1) || "$$(which-chrome Chrome)" $(opts2)

.PHONY: clean
clean: ## remove compiled files
	-$(RM) -r ./ext/*

.PHONY: compile
compile: copy
compile: ## compile JavaScript
	$(JSC) $(JSFLAGS)

.PHONY: copy
copy: flags := --archive --recursive --exclude '*.js'
copy: ## copy asset files
	rsync $(flags) ./src/ ./ext

.PHONY: develop
develop: copy
develop: JSFLAGS += --devtool inline-source-map --watch
develop: ## compile and watch JavaScript
	$(JSC) $(JSFLAGS)

.PHONY: fixpack
fixpack: ## sort entries within package.json
	fixpack

.PHONY: lint
lint: ## lint JavaScript
	eslint --cache .

.PHONY: minify
minify: export NODE_ENV := production
minify: JSFLAGS += --optimize-minimize
minify: ## minify JavaScript
	$(JSC) $(JSFLAGS)

.PHONY: release
release: minify zip ## minify and zip

.PHONY: run
run: flags := --user-data-dir=./env
run: flags += --load-extension=./ext
run: flags += --disable-default-apps
run: flags += --disable-translate
run: flags += --no-default-browser-check
run: flags += --no-first-run
run: ## execute Google Chrome with extension
	"$$(which-chrome Chrome)" $(flags)

.PHONY: zip
zip: ## build zip file for Chrome Web Store
	-$(RM) ./ext.zip
	cd ./ext && zip -r ../ext.zip ./*
