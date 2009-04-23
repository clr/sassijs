require 'rubygems'
require 'packr'

namespace :javascript do

  desc "Concatenate the files together."
  task :join do
    all_scripts = ''
    [
      'pepper',
      'sassijs',
      'helper',
      'string-scanner',
      'sassijs/error',
      'sassijs/environment',
      'sassijs/tree/node',
      'sassijs/tree/attribute',
      'sassijs/tree/comment',
      'sassijs/tree/directive',
      'sassijs/tree/mixin-definition',
      'sassijs/tree/mixin-include',
      'sassijs/tree/rule',
      'sassijs/tree/variable',
      'sassijs/expression/unit',
      'sassijs/expression',
      'sassijs/file',
      'sassijs/line',
      'sassijs/tree',
      'autoloader'
    ].each do |file|
      all_scripts << File.read( File.join( 'lib', file ) + '.js' )
    end
    File.open( 'sassijs.js', 'wb'){ |f| f.write( all_scripts ) }
  end

  desc "Minify.  Currently bombs."
  task :compress do
    compressed = ''
    [
      'pepper',
      'sassijs',
      'helper',
      'string-scanner',
      'sassijs/error',
      'sassijs/environment',
      'sassijs/tree/node',
      'sassijs/tree/attribute',
      'sassijs/tree/comment',
      'sassijs/tree/directive',
      'sassijs/tree/mixin-definition',
      'sassijs/tree/mixin-include',
      'sassijs/tree/rule',
      'sassijs/tree/variable',
      'sassijs/expression/unit',
      'sassijs/expression',
      'sassijs/file',
      'sassijs/line',
      'sassijs/tree'
    ].each do |file|
      compressed << Packr.pack( File.read( File.join( 'lib', file ) + '.js' ) )
    end
    File.open( 'sassijs.min.js', 'wb'){ |f| f.write( compressed ) }
  end

end


