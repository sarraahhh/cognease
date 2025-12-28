from fastapi import FastAPI
from pydantic import BaseModel
from cognitive_model import compute_cognitive_load
from agent_logic import decide_intervention
from llm_agent import simplify_task
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Cognitive Load Agent API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskInput(BaseModel):
    text: str
    complexity: int = 3
    steps: int = 3
    decisions: int = 2
    memory: int = 2
    ui_items: int = 2
    text_len: int = 300
    
def estimate_task_features(text: str):
    length = len(text.split())
    print("DEBUG TEXT LENGTH:", length) 

    steps = text.count(",") + text.count("and") + 1
    complexity = min(5, max(1, length // 25))

    return {
        "complexity": complexity,
        "steps": min(5, steps),
        "decisions": 2,
        "memory": 2,
        "ui_items": 2,
        "text_len": length,
    }



@app.post("/analyze")
def analyze_task(task: TaskInput):
    inputs = estimate_task_features(task.text)


    load_state = compute_cognitive_load(inputs)
    actions = decide_intervention(load_state)

    simplified = None
    if "SIMPLIFY_INFORMATION" in actions:
        simplified = simplify_task(task.text)

    return {
        "cognitive_load": {
            "intrinsic": load_state.intrinsic,
            "extraneous": load_state.extraneous,
            "germane": load_state.germane,
            "total": load_state.total(),
        },
        "actions": actions,
        "simplified_text": simplified,
    }
