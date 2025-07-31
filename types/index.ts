import { Database } from "./supabase-types";

export type Question = Database['public']['Tables']['questions']['Row']&{
    question_choices:Database['public']['Tables']['question_choices']['Row'][]
    child_quests?:Question[]|null
}
export type RandomQuestionView = Database['public']['Views']['random_questions_view']['Row']
export type QuestionChoice = Database['public']['Tables']['question_choices']['Row'];

`create view public.random_questions_view as
select
  q.id,
  q.is_parent,
  q.part_id,
  q.content_text,
  q.content_audio_url,
  q.content_image_url,
  q.difficulty,
  q.tags,
  q.explanation,
from
  questions q
where
  is_parent = 1
order by
  (random());

  `