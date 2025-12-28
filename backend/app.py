# app.py
import streamlit as st
from backend.llm_agent import simplify_task

from backend.agent_logic import decide_intervention

from backend.cognitive_model import compute_cognitive_load

st.set_page_config(page_title="Cognitive Load Agent", layout="wide")
if "simplified_text" not in st.session_state:
    st.session_state.simplified_text = None

st.title("🧠 Cognitive Load Redistribution Agent")
st.caption("Monitoring and estimating cognitive load in real time")

st.divider()

# ─────────────────────────────────────
# INPUT SECTION
# ─────────────────────────────────────


st.subheader("📥 Task Inputs")
task_text = st.text_area(
    "📝 Task Instructions",
    placeholder="Paste the task instructions here (e.g., medical notes, emails, long steps)...",
    height=150
)

col1, col2 = st.columns(2)

with col1:
    complexity = st.slider("Task Complexity", 0, 5, 2)
    steps = st.slider("Number of Steps", 0, 5, 2)
    text_len = st.slider("Instruction Length (words)", 0, 1000, 300)

with col2:
    ui_items = st.slider("UI Elements", 0, 5, 2)
    decisions = st.slider("Decisions Required", 0, 5, 2)
    memory = st.slider("Memory Load Items", 0, 5, 2)

inputs = {
    "complexity": complexity,
    "steps": steps,
    "text_len": text_len,
    "ui_items": ui_items,
    "decisions": decisions,
    "memory": memory
}

st.divider()

# ─────────────────────────────────────
# LOAD COMPUTATION
# ─────────────────────────────────────
load_state = compute_cognitive_load(inputs)
actions = decide_intervention(load_state)


st.subheader("📊 Cognitive Load Estimation")

colA, colB, colC = st.columns(3)

colA.metric("Intrinsic Load", load_state.intrinsic)
colB.metric("Extraneous Load", load_state.extraneous)
colC.metric("Germane Load", load_state.germane)

st.metric("🧠 Total Cognitive Load", load_state.total())

st.divider()
st.subheader("🤖 Agent Decisions")

if not actions:
    st.success("Cognitive load is within manageable limits.")
else:
    for action in actions:
        st.warning(action.replace("_", " "))
        


if "SIMPLIFY_INFORMATION" in actions:
    if st.button("✨ Simplify Instructions (LLM)"):
        if task_text and task_text.strip():
            with st.spinner("🧠 Simplifying instructions..."):
                st.session_state.simplified_text = simplify_task(task_text.strip())
        else:
            st.warning("Please enter task instructions before simplifying.")


if st.session_state.simplified_text:
    st.subheader("✨ Simplified Instructions")
    st.write(st.session_state.simplified_text)


