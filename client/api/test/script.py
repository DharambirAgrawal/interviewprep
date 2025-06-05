import whisper
import torchaudio

# Load Whisper model
model = whisper.load_model("base")

# Load and convert audio to 16kHz mono tensor
waveform, sample_rate = torchaudio.load("Audio-Introduction-0.1.wav")  # Use .wav if possible
resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
waveform = resampler(waveform)

# Make sure it’s mono
if waveform.shape[0] > 1:
    waveform = waveform.mean(dim=0, keepdim=True)

# Convert to numpy for whisper
audio_np = waveform.squeeze().numpy()

# Use Whisper's transcribe method bypassing audio loading
result = model.transcribe(audio_np)

print(result["text"])
