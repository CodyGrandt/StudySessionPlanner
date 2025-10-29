from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fuzzy.engine import evaluate

app = FastAPI()

# Allow frontend (Vite dev server) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    energy: int   # 0–100
    time: int     # 0–120 minutes
    urgency: int  # 0–10

@app.post("/recommend")
def recommend(data: InputData):
    result = evaluate({
        "energy": data.energy,
        "time": data.time,
        "urgency": data.urgency
    })
    return {"recommended_duration": result}
