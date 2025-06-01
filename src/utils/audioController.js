import * as THREE from "three";

class AudioController {
  #listener = null;
  #sound = null;

  init(camera, volumeLevel, isLoop = false) {
    if (this.#listener || this.#sound) return;

    this.#listener = new THREE.AudioListener();
    camera.add(this.#listener);

    this.#sound = new THREE.Audio(this.#listener);
    this.#sound.setLoop(isLoop);
    this.#sound.setVolume(volumeLevel);
  }

  play(src) {
    if (!this.#sound) return;

    const loader = new THREE.AudioLoader();
    loader.load(src, (buffer) => {
      this.#sound.setBuffer(buffer);
      this.#sound.play();
    });
  }

  setVolume(level) {
    this.#sound?.setVolume(level);
  }

  cleanup(camera) {
    this.#sound?.stop();
    if (this.#listener) camera.remove(this.#listener);

    this.#sound = null;
    this.#listener = null;
  }
}

export default AudioController;
