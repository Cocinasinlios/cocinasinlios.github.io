for raw in re.findall(r"url\(\s*['\"]?(/[^)'\"\s]+)", text, flags=re.I):\nSITE QA: ERROR\n")
    for p in problems:
        print(" -", p)
    if warnings:
        print("\nAvisos de calidad:")
        for w in warnings:
            print(" !", w)
    sys.exit(1)

print(f"SITE QA: OK · {recipe_count} recetas · enlaces internos y separación editorial verificados")
if warnings:
    print("Avisos de calidad:")
    for w in warnings:
        print(" !", w)
