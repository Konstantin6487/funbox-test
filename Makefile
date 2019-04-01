install: install-deps

start:
	npm start

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

lint:
	npx eslint . --ext .js --ext .jsx

.PHONY: test
