OVERLOAD_THRESHOLD = 18
EXTRANEOUS_DOMINANT = 6
def decide_intervention(load_state):
    actions = []

    if load_state.total() >= OVERLOAD_THRESHOLD:
        actions.append("OVERLOAD_DETECTED")

        if load_state.extraneous >= EXTRANEOUS_DOMINANT:
            actions.append("SIMPLIFY_INFORMATION")

        if load_state.intrinsic >= 7:
            actions.append("CHUNK_TASK")

        if load_state.germane >= 7:
            actions.append("DEFER_DECISIONS")

    return actions
