const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const babel = require('babel-core')

const stacks = {
	copy: {
		'node_modules/babel-polyfill/dist/polyfill.min.js': 'www/vendor/',
		'node_modules/bluebird/js/browser/bluebird.min.js': 'www/vendor/'
	},
	transpile: {
		'src/js/index.js': 'www/js/'
	}
}

const opps = {
	copy: (from, toDir, toFile) => {
		const toPath = toDir + toFile

		mkdirp(toDir, err => {
			if (err) {
				return err
			}

			const rs = fs.createReadStream(from)
			const ws = fs.createWriteStream(toPath)

			rs.on('end', () => {
				console.log(`Copied: ${from}, to: ${toPath}`)
				ws.close()
			})

			rs.pipe(ws)
		})
	},

	transpile: (from, toDir, toFile) => {
		const toPath = toDir + toFile

		mkdirp(toDir, err => {
			if (err) {
				return err
			}

			const rs = fs.createReadStream(from, 'utf8')
			const ws = fs.createWriteStream(toPath, 'utf8')

			let content = ''

			rs.on('data', data => {
				content += data
				// console.log(data)
			})

			rs.on('end', () => {
				const es5 = babel.transform(content, {
					presets: ['es2015']
				})
				ws.write(es5.code)
				console.log(`Transpiled: ${from}, to: ${toPath}`)
			})
		})
	}
}



const go = stackName => {
	const stack = stacks[stackName]
	const opp = opps[stackName]

	Reflect.ownKeys(stack).forEach(key => {
		const from = key
		const file = path.parse(key)
		const toDir = stack[key]
		const toFile = file.base
		opp(from, toDir, toFile)
	})
}

go('copy')
go('transpile')
