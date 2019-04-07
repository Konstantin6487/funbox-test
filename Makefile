setup: install-deps

start:
	npm start

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

lint:
	npx eslint . --ext .js --ext .jsx

test-ui:
	npm run cypress

test:
	npm run cypress:all

.PHONY: test
