import { UserProfile, Message } from "./definitions";

export const userProfile: UserProfile = {
    name: "Newton Huynh",
    height: "5'8",
    answer_style: "detailed", 
    gender: "male",
    age: 25,
    weight: "180",
    goal: "hypertrophy",
}

export const messageHistory: Message[] = [
    {
        question: "What is the most effective way to build muscle for beginners?",
        answer: "The number of days you should work out depends on your fitness goals and preferences. Here are some options to consider based on the information provided:\n\n1. **4-Day Workout Split**: This split is effective for building muscle strength and size as it allows you to hit each major muscle group twice a week [1]. It also provides flexibility to focus on additional goals like cardio or conditioning on the spare days [1].\n\n2. **3-Day Workout Split**: While popular and effective, this split may not provide enough training stimulus to maximize muscle growth as it focuses on major muscle groups only once a week [2]. However, this split can be a good option for time-poor individuals [2].\n\n3. **Full Body Split (2-3 Days)**: Working out with a full-body split 2-3 days a week can be time-efficient and effective for muscle growth and strength gains as long as weekly volume is maintained [3]. This method also allows for flexibility to program in rest days or other types of training like cardio [3].\n\n4. **Upper-Lower Workout Split (4 Days)**: Studies have shown that strength training over a 4-day split is effective in building muscle mass and strength while allowing adequate recovery time [5]. This split involves alternating between upper body and lower body workouts [5].\n\nConsider your schedule, preferences, and fitness goals when choosing the number of days to work out. It's important to listen to your body, provide adequate rest, and ensure balanced training to avoid muscle imbalances over time.",
        citations: [
            {
                "title": "The Best Workout Splits For Every Goal | Gymshark Central",
                "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
              },
              {
                "title": "The Best Workout Splits For Every Goal | Gymshark Central",
                "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
              },
              {
                "title": "The Best Workout Splits For Every Goal | Gymshark Central",
                "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
              },
              {
                "title": "The Best Workout Splits For Every Goal | Gymshark Central",
                "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
              },
              {
                "title": "The Best Workout Splits For Every Goal | Gymshark Central",
                "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
              }
        ],
    },
    {
        question: "How many times a week should I work out to gain muscle efficiently?",
        answer: "To gain muscle efficiently, aim for 3–5 strength training sessions per week. Research suggests that training each muscle group twice per week yields better hypertrophy results than once-a-week routines. For example, doing an upper/lower split or push/pull/legs split can help balance volume and recovery. Rest days are crucial to allow your muscles to repair and grow. It's also important to vary intensity and volume to avoid plateaus.",
        citations: [
            {
                title: "The Science of Muscle Growth",
                url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6950543/",
            },
            {
                title: "Training Frequency for Muscle Hypertrophy",
                url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5485202/",
            },
        ],
    },
    {
        question: "What kind of diet should I follow to support muscle growth?",
        answer: "To support muscle growth, follow a high-protein, calorie-surplus diet. Prioritize whole foods such as lean meats, fish, eggs, dairy, legumes, whole grains, and healthy fats like nuts and olive oil. Aim for around 1.6–2.2 grams of protein per kilogram of bodyweight per day. Carbohydrates are also crucial as they fuel workouts and aid recovery. Hydration, micronutrients, and meal timing (e.g., post-workout protein intake) all play supporting roles in optimizing muscle growth.",
        citations: [
            {
                title: "Protein Requirements for Muscle Gain",
                url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0187-8",
            },
            {
                title: "Nutrition for Muscle Growth",
                url: "https://www.precisionnutrition.com/all-about-muscle-building",
            },
        ],
    }
    
    
]