setup: install-deps

start:
	npm run dev

install-deps:
	npm ci

build:
	npm run prod

lint:
	npx eslint . --ext .js --ext .jsx

test-ui:
	npm run cypress

test:
	npm run cypress:all

.PHONY: test
