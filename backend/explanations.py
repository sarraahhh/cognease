def generate_explanations(actions, load_state):
    explanations = []

    if "OVERLOAD_DETECTED" in actions:
        explanations.append(
            "Your total cognitive load crossed a safe threshold, indicating possible mental overload."
        )

    if "SIMPLIFY_INFORMATION" in actions:
        explanations.append(
            "A high extraneous load was detected, meaning the way information is presented may be overwhelming."
        )

    if "CHUNK_TASK" in actions:
        explanations.append(
            "The task itself appears complex. Breaking it into smaller steps can reduce mental strain."
        )

    if "DEFER_DECISIONS" in actions:
        explanations.append(
            "High decision-making pressure was detected. Deferring non-critical decisions may help."
        )

    if not explanations:
        explanations.append(
            "Your cognitive load is currently balanced and within manageable limits."
        )

    return explanations
