// character codes
// w = 119
// a = 97
// s = 115
// d = 100
// f = 102
// g = 103
// 
// left = 37
// up = 38
// right = 39
// down = 40

// 1 thru 7 = 49 thru 55

var SymbolMeta = {
    math_m : {
        keys: [37],
        sounds: './audio/andreas-klein_jazz-kit-snare-on-brush-rebound_drums_one_shot_.mp3',
        source_id: 'shape-sprites_math-m',
        x: 198,
        y: 15,
        animEnv : {
            attack: 300,
            sustain: 350,
            release: 500
        }
    },

    math_a : {
        keys: [38],

        sounds: './audio/elecPiano_03.mp3',
        source_id: 'shape-sprites_math-a',
        x: 454,
        y: 16,
        animEnv : {
            attack: 140,
            sustain: 300,
            release: 500
        }
    },

    math_t : {
        keys: [39],
        sounds: './audio/upBass_01.mp3',
        source_id: 'shape-sprites_math-t',
        x: 595,
        y: 14,
        animEnv : {
            attack: 240,
            sustain: 300,
            release: 700
        }
    },

    math_h : {
        keys: [40],
        sounds: './audio/harpopipe.mp3',
        source_id: 'shape-sprites_math-h',
        mina: 'elastic',
        x: 754,
        y: 12,
        animEnv : {
            attack: 60,
            sustain: 120,
            release: 320
        }
    },

    science_s : {
        keys: [119],
        sounds: './audio/banana-shaker_test_01.mp3',
        source_id: 'shape-sprites_science-s',
        x: 24,
        y: 200,
        animEnv : {
            attack: 30,
            sustain: 100,
            release: 500
        }
    },

    science_c1 : {
        keys: [97],
        sounds: './audio/sinatra_cymbal1.mp3',
        source_id: 'shape-sprites_science-c1',
        x: 179,
        y: 200,
        animEnv : {
            attack: 30,
            sustain: 20,
            release: 2000
        }
    },

    science_i : {
        keys: [115],
        sounds: './audio/acGtrA_03.mp3',
        source_id: 'shape-sprites_science-i',
        x: 280,
        y: 192,
        animEnv : {
            attack: 300,
            sustain: 500,
            release: 750
        }
    },

    science_e1 : {
        keys: [100],
        sounds: './audio/drums_sinatra1_tambodrum.mp3',
        source_id: 'shape-sprites_science-e1',
        x: 384,
        y: 203,
        animEnv : {
            attack: 30,
            sustain: 100,
            release: 500
        }
    },

    science_n : {
        keys: [102],
        sounds: './audio/drums_sinatra1_talkdrum.mp3',
        source_id: 'shape-sprites_science-n',
        x: 542,
        y: 203,
        animEnv : {
            attack: 30,
            sustain: 100,
            release: 500
        }
    },

    science_c2 : {
        keys: [103],
        sounds: './audio/snare_01.mp3',
        source_id: 'shape-sprites_science-c1',
        x: 677,
        y: 200,
        animEnv : {
            attack: 30,
            sustain: 100,
            release: 500
        }
    },

    science_e2 : {
        keys: [32],
        sounds: './audio/kicks_1_01.mp3',
        source_id: 'shape-sprites_science-e1',
        x: 786,
        y: 203,
        animEnv : {
            attack: 150,
            sustain: 300,
            release: 500
        }
    },

    music_m : {
        keys: [49],
        sounds: './audio/triangle.mp3',
        source_id: 'shape-sprites_music-m',
        x: 0,
        y: 356,
        mina: 'easein',
        animEnv : {
            attack: 120,
            sustain: 140,
            release: 500
        }
    },

    music_u : {
        keys: [50],
        sounds: './audio/vibes_bass_01.mp3',
        source_id: 'shape-sprites_music-u',
        x: 260,
        y: 400,
        mina: 'easeout',
        animEnv : {
            attack: 300,
            sustain: 300,
            release: 500
        }
    },

    music_s : {
        keys: [51],
        sounds: './audio/70889__spukkin__trumpet1.mp3',
        source_id: 'shape-sprites_music-s',
        x: 393,
        y: 374,
        animEnv : {
            attack: 500,
            sustain: 600,
            release: 600
        }
    },

    music_i : {
        keys: [52],
        sounds: './audio/flute_01.mp3',
        source_id: 'shape-sprites_music-i',
        x: 620,
        y: 375,
        mina:'elastic',
        animEnv : {
            attack: 30,
            sustain: 300,
            release: 300
        }
    },

    music_c : {
        keys: [53],
        sounds: './audio/vox_scratch4.mp3',
        source_id: 'shape-sprites_music-c',
        x: 698,
        y: 400,
        mina: 'easein',
        animationType: 'rotate',
        animEnv : {
            attack: 100,
            sustain: 20,
            release: 300
        }
    },
};