const axios = require('axios').default;

//let movie = 'http://ubuvideo.memoryoftheworld.org/Niblock_Phil_Movement_of_People_Working_Part1_1973_1983.iphone.m4v';
//let movie = 'http://ubuvideo.memoryoftheworld.org/Niblock-Phil_Magic-Sun_1966.mp4';
let movie = 'files/Cocteau.Richter.8x8.A.Chess.Sonata.iphone.m4v';

/*(async () => {
    console.log('loading');
    const results = await axios.get(movie);
    console.log(results);
    console.log('loaded');
})().catch(e => {
    // Deal with the fact the chain failed
});*/

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath);

let duration;

ffmpeg.ffprobe('files/Cocteau.Richter.8x8.A.Chess.Sonata.iphone.m4v', function(err, metadata) {
    //console.dir(metadata); // all metadata
    duration = metadata.format.duration;

    (async () => {
      let index = 0;
      while (index < duration) {

        let ffm = ffmpeg('files/Cocteau.Richter.8x8.A.Chess.Sonata.iphone.m4v');

        setTimeout(createSlice, 400 * index, ffm, index);

        index += 10;

        
    }
    })().catch(e => {
        // Deal with the fact the chain failed
    });
    
    
});

async function createSlice(ffm, index) {

  let padToFour;
  if (index<=9999) { padToFour = ("000"+index).slice(-4); }

  ffm.setStartTime(index)
  .setDuration('10')
  .output('slices/video_out' + padToFour + '.mp4')
  .on('end', function(err) {
    if(!err) { console.log('conversion Done') }
  })
  .on('error', function(err){
    console.log('error: ', err)
  }).run();

  console.log('sliced ' + index);

}