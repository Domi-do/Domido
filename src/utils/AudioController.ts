import * as THREE from "three";

class AudioController {
  private listener: THREE.AudioListener | null = null;
  private sound: THREE.Audio | null = null;

  init(camera: THREE.Camera, volumeLevel: number, isLoop: boolean = false): void {
    if (this.listener || this.sound) return;

    this.listener = new THREE.AudioListener();
    camera.add(this.listener);

    this.sound = new THREE.Audio(this.listener);
    this.sound.setLoop(isLoop);
    this.sound.setVolume(volumeLevel);
  }

  play(src: string): void {
    if (!this.sound) return;

    if (this.sound.isPlaying) {
      this.sound.stop();
    }

    const loader = new THREE.AudioLoader();
    loader.load(src, (buffer: AudioBuffer) => {
      this.sound!.setBuffer(buffer);
      this.sound!.play();
    });
  }

  setVolume(level: number): void {
    this.sound?.setVolume(level);
  }

  cleanup(camera: THREE.Camera): void {
    this.sound?.stop();
    if (this.listener) camera.remove(this.listener);

    this.sound = null;
    this.listener = null;
  }
}

export default AudioController;
