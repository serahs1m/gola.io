import openai
import pandas as pd

# 최신 버전에서는 client 객체 생성 필요

# 엑셀에서 기존 데이터 불러오기
df = pd.read_excel("sat_data.xlsx")

# GPT로 유사 문제 생성하는 함수
def generate_similar_question(domain, difficulty, skill):
    prompt = (
        f"Create a new SAT math question similar to this category:\n"
        f"Domain: {domain}\n"
        f"Difficulty: {difficulty}\n"
        f"Skill: {skill}\n"
        f"Provide:\n"
        f"1. The question\n"
        f"2. The correct answer\n"
        f"3. A short explanation"
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert SAT math problem generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=500,
    )

    return response.choices[0].message.content

# 생성 결과 저장용 리스트
generated_data = []

# 데이터 앞에서 5개만 테스트용으로 생성
for idx, row in df.head(5).iterrows():
    domain = row['Domain']
    difficulty = row['Difficulty']
    skill = row['Skill']

    output = generate_similar_question(domain, difficulty, skill)

    try:
        parts = output.split("Explanation:")
        qa = parts[0].split("Answer:")
        question = qa[0].replace("Question:", "").strip()
        answer = qa[1].strip() if len(qa) > 1 else ""
        explanation = parts[1].strip() if len(parts) > 1 else ""

        generated_data.append({
            "Domain": domain,
            "Difficulty": difficulty,
            "Skill": skill,
            "Question": question,
            "Answer": answer,
            "Explanation": explanation
        })
    except Exception as e:
        print(f"⚠️ Parsing error on row {idx}: {e}")

# 결과를 엑셀로 저장
gen_df = pd.DataFrame(generated_data)
gen_df.to_excel("generated_sat_questions.xlsx", index=False)
print("✅ 문제 생성 완료! 'generated_sat_questions.xlsx'에 저장됨")
