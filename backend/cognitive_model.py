from dataclasses import dataclass

@dataclass
class CognitiveLoad:
    intrinsic: int
    extraneous: int
    germane: int

    def total(self):
        return min(100, self.intrinsic + self.extraneous + self.germane)


def compute_cognitive_load(inputs):
    
    intrinsic = (
        inputs["complexity"] * 12
        + inputs["text_len"] // 10
    )

    
    extraneous = (
        inputs["steps"] * 8
        + inputs["ui_items"] * 5
        + inputs["decisions"] * 6
    )

    
    germane = inputs["memory"] * 8

    return CognitiveLoad(
        intrinsic=min(60, intrinsic),
        extraneous=min(30, extraneous),
        germane=min(20, germane),
    )
