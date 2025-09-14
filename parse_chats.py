import json
import os
from typing import List, Dict, Any

def parse_chat_file(file_path: str) -> List[Dict[str, str]]:
    """Parse a chat export file and extract prompts and answers."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    conversations = []
    
    for chat in data:
        if 'chat' in chat and 'history' in chat['chat'] and 'messages' in chat['chat']['history']:
            messages = chat['chat']['history']['messages']
            
            # Sort messages by timestamp to maintain order
            sorted_messages = sorted(messages.values(), key=lambda x: x.get('timestamp', 0))
            
            # Group messages into conversation turns
            for i in range(0, len(sorted_messages) - 1, 2):
                if i + 1 < len(sorted_messages):
                    user_msg = sorted_messages[i]
                    assistant_msg = sorted_messages[i + 1]
                    
                    # Only process if the roles are correct
                    if (user_msg.get('role') == 'user' and 
                        assistant_msg.get('role') == 'assistant' and
                        'content' in user_msg and 'content' in assistant_msg):
                        
                        conversations.append({
                            'prompt': user_msg['content'],
                            'answer': assistant_msg['content'],
                            'source_file': os.path.basename(file_path)
                        })
    
    return conversations

def process_directory(directory: str) -> List[Dict[str, str]]:
    """Process all JSON files in the given directory."""
    all_conversations = []
    
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            file_path = os.path.join(directory, filename)
            try:
                conversations = parse_chat_file(file_path)
                all_conversations.extend(conversations)
                print(f"Processed {filename}: Found {len(conversations)} conversations")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")
    
    return all_conversations

def save_to_json(conversations: List[Dict[str, str]], output_file: str) -> None:
    """Save conversations to a JSON file."""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(conversations, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(conversations)} conversations to {output_file}")

def main():
    # Directory containing the chat export files
    input_dir = os.path.join(os.path.dirname(__file__), 'Initial_docs')
    output_file = os.path.join(os.path.dirname(__file__), 'parsed_conversations.json')
    
    # Process all JSON files in the directory
    conversations = process_directory(input_dir)
    
    # Save the results
    save_to_json(conversations, output_file)
    
    # Print a sample
    if conversations:
        print("\nSample conversation:")
        print(f"Prompt: {conversations[0]['prompt'][:200]}...")
        print(f"Answer: {conversations[0]['answer'][:200]}...")

if __name__ == "__main__":
    main()
