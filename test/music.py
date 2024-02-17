import numpy as np
import pyaudio

# 定义音频参数
BITRATE = 44100  # 每秒采样率
DURATION = 1  # 持续时间（秒）

# 计算音符的频率
def calculate_frequency(note_number):
    return 440 * (2 ** ((note_number - 49) / 12))

# 计算生成的波形数据
def generate_wave(freq):
    num_samples = int(BITRATE * DURATION)
    # 生成时间序列
    time = np.linspace(0, DURATION, num_samples)
    # 生成正弦波
    wave = np.sin(2 * np.pi * freq * time)
    return wave.astype(np.float32)

# 播放音频
def play_audio(wave):
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paFloat32,
                    channels=1,
                    rate=BITRATE,
                    output=True)
    stream.write(wave.tobytes())
    stream.stop_stream()
    stream.close()
    p.terminate()

# 音符编号以中央 C 为基准，中央 C 的编号是 40
piano_notes = {
    'C': 40,
    'C#': 41,
    'D': 42,
    'D#': 43,
    'E': 44,
    'F': 45,
    'F#': 46,
    'G': 47,
    'G#': 48,
    'A': 49,
    'A#': 50,
    'B': 51
}

# 生成并播放音符
if __name__ == "__main__":
    frequency = calculate_frequency(piano_notes['C'])
    wave = generate_wave(frequency)
    play_audio(wave)
