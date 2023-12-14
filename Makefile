# https://www.gnu.org/software/make/manual/html_node/Wildcard-Function.html
# https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
# https://www.gnu.org/software/make/manual/make.html#Prerequisite-Types
njk := $(wildcard views/*.njk)
in_static := $(wildcard static/*.*)
out_static := $(addprefix _site/,$(in_static))

all: $(out_static)

_site/static/%.js: static/%.js
	cp $< $@

_site/static/%.png: static/%.png
	cp $< $@

_site/static/%.css: static/%.css $(njk)
	touch $@
	npx postcss $< -o $@

dir:
	mkdir -p _site/static
