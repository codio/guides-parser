parser = require '../'
expect = require('chai').expect


describe 'guides parser', ->
  describe 'directives', ->
    describe 'title ', ->
      it 'simple', ->
        input = """
        ---
        title: My title
        ---
        My content
        """

        output =
          header:
            title: 'My title'
          body: 'My content'

        expect(parser.parse input).to.deep.equal output


      it 'fails on non string title', ->
        input = """
        ---
        title: 3
        ---
        """

        expect(parser.parse(input).errors).to.have.length 1

      it 'fails on missing title', ->
        input = """
        ---
        ---
        """

        expect(parser.parse(input).errors).to.have.length 1


    describe 'files', ->
      it 'simple', ->
        input = """
        ---
        title: My title
        files:
          - panel: 3
            path: 'some/path.js'
            ref: 22
            lineCount: 1
        ---
        My content
        """

        output =
          header:
            files: [
              panel: 3,
              path: 'some/path.js',
              ref: 22,
              lineCount: 1
            ],
            title: 'My title'
          body: 'My content'

        expect(parser.parse input).to.deep.equal output

      it 'fails on missing path', ->
        input = """
        ---
        title: My title
        files:
          - panel: 3
            ref: 22
            lineCount: 1
        ---
        My content
        """

        expect(parser.parse(input).errors).to.have.length 1

    describe 'editable', ->
      it 'simple', ->
        input = """
        ---
        title: My title
        editable: true
        ---
        My content
        """

        output =
          header:
            editable: true
            title: 'My title'
          body: 'My content'

        expect(parser.parse input).to.deep.equal output

    describe 'layout', ->
      it 'simple', ->
        input = """
        ---
        title: My title
        layout: Some layout
        ---
        My content
        """

        output =
          header:
            layout: 'Some layout'
            title: 'My title'
          body: 'My content'

        expect(parser.parse input).to.deep.equal output
