/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function(data){
  data.content = data.content.replace(/<p><img src="(.*?)" alt="(.*?)"(?: title="(.*?)")?><\/p>/g, '<div class="img-wrap"><div class="img-bg"><img class="img" src="$1" alt="$2" title="$3"\/><\/div><span class="image-caption">$2<\/span><\/div>');
  return data;
});
