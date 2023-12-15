# https://www.gnu.org/software/make/manual/html_node/Wildcard-Function.html
# https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
# https://www.gnu.org/software/make/manual/make.html#Prerequisite-Types
njk := $(wildcard views/*.njk)
in_static := $(wildcard static/*.*)
out_static := $(patsubst static/%,public/%,$(in_static))

all: $(out_static)

public/%.js: static/%.js
	cp $< $@

public/%.png: static/%.png
	cp $< $@

public/%.css: static/%.css $(njk)
	touch $@
	npx postcss $< -o $@

dir:
	mkdir -p public
