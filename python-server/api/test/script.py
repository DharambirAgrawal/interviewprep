import whisper
# Load Whisper model
model = whisper.load_model("base")

# Use Whisper's transcribe method bypassing audio loading
result = model.transcribe("Audio-Introduction-0.1.mp3")

print(result["text"])
