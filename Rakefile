
def all_files
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
  ].collect{ |f| f + '.js' }
end

namespace :javascript do

  desc "Concatenate the files together."
  task :join do
    all_scripts = ''
    all_files.each do |file|
      all_scripts << File.read( File.join( 'lib', file ) )
    end
    File.open( 'sassijs.js', 'wb'){ |f| f.write( all_scripts ) }
  end

  desc "Minify the concatenated files."
  task :compress => :join do
    `./jsmin.rb <./sassijs.js >./sassijs.min.js`
  end

end


